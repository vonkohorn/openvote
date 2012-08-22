import json
import os
import pkgutil
import urllib2

from django.contrib.auth import logout as auth_logout
from django.shortcuts import render_to_response, redirect

from social_auth import backends
from social_auth.models import UserSocialAuth

from openvote.models import Voter

# Views
def home(request):
    client_ip = _get_client_ip(request)
    lat, lon = _get_client_location(client_ip)
    user = request.user
    voter = None
    if user.is_authenticated():
        social_user = UserSocialAuth.get_social_auth_for_user(user)[0]
        voter = _create_or_get_voter(social_user, lat, lon)
    return render_to_response('openvote/templates/angularbase.html', locals())

def maptest(request):
    client_ip = _get_client_ip(request)
    lat, lon = _get_client_location(client_ip)
    user = request.user
    voter = None
    if user.is_authenticated():
        social_user = UserSocialAuth.get_social_auth_for_user(user)[0]
        voter = _create_or_get_voter(social_user, lat, lon)
    return render_to_response('openvote/templates/maptest.html', locals())

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
    lat = 37.4419 if decoded['latitude'] == "0" else decoded['latitude']
    lon = -94.1419 if decoded['longitude'] == "0" else decoded['longitude']
    return lat, lon

def _create_or_get_voter(user, lat, lon):
    uid = user.uid

    try:
        voter = Voter.objects.get(anonkey=uid)
    except:
        voter = Voter(
            anonkey = uid,
            first_name = "",
            last_name = "",
            nickname = user.user.username,
            provider = user.provider,
            lastlat = lat,
            lastlon = lon,
            avglat = lat,
            avglon = lon,
            geoupdates = 0)
        voter.save()

    return voter
    
    
