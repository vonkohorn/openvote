from django.db import models

from openvote.models import Voter

class Election(models.Model):
    name = models.CharField(max_length=140)
    desc = models.CharField(max_length=500)
    htmlslug = models.TextField()
    admin = models.ForeignKey(Voter)

    votercount = models.PositiveIntegerField()
    avglat = models.DecimalField(max_digits=7, decimal_places=4)
    avglon = models.DecimalField(max_digits=7, decimal_places=4)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # lastlat & avglat:
    # votercount = select count from vote where :
    #   lastlat = current lat
    #   avglat = (lastlat + avglat*geoupdates)/(geopudates + 1)
    #   increment geoupdates
    
class Candidate(models.Model):
    election = models.ForeignKey(Election)
    voter = models.ForeignKey(Voter)
    name = models.CharField(max_length=140)
    desc = models.CharField(max_length=500)
    htmlslug = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Vote(models.Model):
    voter = models.ForeignKey(Voter)
    candidate = models.ForeignKey(Candidate)
    election = models.ForeignKey(Election)      # redundant, but speeds up queries.  helpful?  maybe not.
    approval = models.BooleanField()
    created = models.DateTimeField(auto_now_add=True)

class InterestEstimate():
    voter = models.ForeignKey(Voter)
    election = models.ForeignKey(Election)
    distance = models.PositiveIntegerField()   # meters
    accuracy = models.PositiveIntegerField()   # meters of uncertainty
    interestestimate = models.DecimalField(max_digits=7, decimal_places=4)

    # interestestimate = election.votercount / (self.distance + self.accuracy)