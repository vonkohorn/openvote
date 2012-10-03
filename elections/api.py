from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from elections.models import Vote, InterestEstimate

#class ElectionResource(ModelResource):
    #class Meta:
        #queryset = Election.objects.all()
        #resource_name = 'election'
        #authorization = Authorization()
        
#class CandidateResource(ModelResource):
    #class Meta:
        #queryset = Candidate.objects.all()
        #resource_name = 'candidate'
        #authorization = Authorization()
        
class VoteResource(ModelResource):
    class Meta:
        queryset = Vote.objects.all()
        resource_name = 'vote'
        authorization = Authorization()
        
class InterestEstimateResource(ModelResource):
    class Meta:
        queryset = InterestEstimate.objects.all()
        resource_name = 'interest_estimate'
        authorization = Authorization()
