from django.shortcuts import render_to_response
from social_auth import backends
import os
import pkgutil
from django.contrib.auth import logout as auth_logout
from django.http import HttpResponseRedirect



# Create your views here.
def home(request):
    return render_to_response('openvote/templates/home.html', {'user': request.user})

def login(request):
    backend = [pack[1] for pack in pkgutil.walk_packages([os.path.dirname(backends.__file__)])]
    return render_to_response('openvote/templates/login.html', {'backend': backend})

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect('/')