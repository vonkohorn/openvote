from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import SessionAuthentication

from elections.models import Election, Candidate, Vote, InterestEstimate

class GETOnlyAuthorization(SessionAuthentication):
    def is_authenticated(self, request, **kwargs):
        """
        Checks to make sure the user is logged in & has a Django session,
        unless it's just a GET request.
        """
        if request.method in ('GET'):
            return True
        else:
            return super(GETOnlyAuthorization, self).is_authenticated(request, **kwargs)

class ElectionResource(ModelResource):
    admin = fields.ToOneField('openvote.api.VoterResource', 'admin')

    class Meta:
        queryset = Election.objects.all()
        resource_name = 'election'
        authorization = Authorization()
        authentication = GETOnlyAuthorization()
        
class CandidateResource(ModelResource):
    election = fields.ToOneField(ElectionResource, 'election')

    class Meta:
        queryset = Candidate.objects.all()
        resource_name = 'candidate'
        authorization = Authorization()
        authentication = GETOnlyAuthorization()
        
class VoteResource(ModelResource):
    election = fields.ToOneField(ElectionResource, 'election')
    voter = fields.ToOneField('openvote.api.VoterResource', 'voter')
    candidate = fields.ToOneField(CandidateResource, 'candidate')

    class Meta:
        queryset = Vote.objects.all()
        resource_name = 'vote'
        authorization = Authorization()
        authentication = GETOnlyAuthorization()
        
#class InterestEstimateResource(ModelResource):
    #class Meta:
        #queryset = InterestEstimate.objects.all()
        #resource_name = 'interest_estimate'
        #authorization = Authorization()
