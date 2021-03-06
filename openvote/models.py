from django.db import models

class Voter(models.Model):
    anonkey = models.CharField(max_length=40)

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    nickname = models.CharField(max_length=50)
    provider = models.CharField(max_length=50)
    
    lastlat = models.DecimalField(max_digits=7, decimal_places=4)
    lastlon = models.DecimalField(max_digits=7, decimal_places=4)
    avglat = models.DecimalField(max_digits=7, decimal_places=4)
    avglon = models.DecimalField(max_digits=7, decimal_places=4)
    geoupdates = models.PositiveSmallIntegerField()
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
