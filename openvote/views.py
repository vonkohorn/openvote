import json
import os
import pkgutil
import urllib2

from django.contrib.auth import logout as auth_logout
from django.shortcuts import render_to_response, redirect

from social_auth import backends

# Views
def home(request):
    client_ip = _get_client_ip(request)
    lat, lon = _get_client_location(client_ip)
    user = request.user
    # backend = [pack[1] for pack in pkgutil.walk_packages([os.path.dirname(backends.__file__)])]
    return render_to_response('openvote/templates/base.html', locals())

def logout(request):
    auth_logout(request)
    return redirect("home")

def about(request):
    return render_to_response('openvote/templates/about.html', locals())
def help(request):
    return render_to_response('openvote/templates/help.html', locals())
def terms(request):
    return render_to_response('openvote/templates/terms.html', locals())
def privacy(request):
    return render_to_response('openvote/templates/privacy.html', locals())
def code(request):
    return render_to_response('openvote/templates/code.html', locals())
    

# Internal
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
    lat = 37.4419 if decoded['latitude'] else decoded['latitude']
    lon = -94.1419 if decoded['latitude'] else decoded['latitude']
    return lat, lon

