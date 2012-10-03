from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from openvote.models import Voter

class VoterResource(ModelResource):
    class Meta:
        queryset = Voter.objects.all()
        resource_name = 'voter'
        authorization = Authorization()
        
#class RoleResource(ModelResource):
    #class Meta:
        #queryset = Role.objects.all()
        #resource_name = 'role'
        #authorization = Authorization()
