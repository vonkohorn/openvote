from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from elections.models import Election, Candidate, Vote, InterestEstimate

class ElectionResource(ModelResource):
    admin = fields.ToOneField('openvote.api.VoterResource', 'admin')

    class Meta:
        queryset = Election.objects.all()
        resource_name = 'election'
        authorization = Authorization()
        
class CandidateResource(ModelResource):
    election = fields.ToOneField(ElectionResource, 'election')

    class Meta:
        queryset = Candidate.objects.all()
        resource_name = 'candidate'
        authorization = Authorization()
        
class VoteResource(ModelResource):
    election = fields.ToOneField(ElectionResource, 'election')
    voter = fields.ToOneField('openvote.api.VoterResource', 'voter')
    candidate = fields.ToOneField(CandidateResource, 'candidate')

    class Meta:
        queryset = Vote.objects.all()
        resource_name = 'vote'
        authorization = Authorization()
        
#class InterestEstimateResource(ModelResource):
    #class Meta:
        #queryset = InterestEstimate.objects.all()
        #resource_name = 'interest_estimate'
        #authorization = Authorization()
