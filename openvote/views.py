import json
import os
import pkgutil
import urllib2

from django.contrib.auth import logout as auth_logout
from django.shortcuts import render_to_response, redirect

from social_auth import backends

# Create your views here.
def home(request):
    client_ip = _get_client_ip(request)
    lat, lon = _get_client_location(client_ip)
    user = request.user
    return render_to_response('openvote/templates/home.html', locals())

def login(request):
    backend = [pack[1] for pack in pkgutil.walk_packages([os.path.dirname(backends.__file__)])]
    return render_to_response('openvote/templates/login.html', {'backend': backend})

def logout(request):
    auth_logout(request)
    return redirect("home")

def _get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def _get_client_location(ip):
    u = urllib2.urlopen('http://freegeoip.net/json/{0}'.format(ip))
    decoded = json.load(u)
    u.close()
    return decoded['latitude'], decoded['longitude']
