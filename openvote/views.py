import json
import os
import pkgutil
import urllib2

from django.contrib.auth import logout as auth_logout
from django.shortcuts import render_to_response, redirect
from django.utils.safestring import SafeString

from social_auth import backends
from social_auth.models import UserSocialAuth

from openvote.models import Voter
from elections.models import Election, Candidate, Vote
from rest.serialize import JSONSerializer

# Views
def home(request):
    jsonSerializer = JSONSerializer()
    client_ip = _get_client_ip(request)
    lat, lon = _get_client_location(client_ip)
    user = request.user
    voter = None
    final_votes_json = {}
    if user.is_authenticated():
        social_user = UserSocialAuth.get_social_auth_for_user(user)[0]
        voter = _create_or_get_voter(social_user, lat, lon)
        votes_data = jsonSerializer.serialize(Vote.objects.filter(voter=voter))
        votes_json = json.loads(votes_data)
        for vote in votes_json:
            final_votes_json[vote["election_guuid"]] = vote

    # Grab the relevant voter
    voter_json = json.loads("{}")
    if voter is not None:
        voter_json = jsonSerializer.serialize(voter, use_natural_keys=True)
    voter_json = SafeString(voter_json)

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
        # TODO: Update lat/lon here
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

    # Grab all elections (for now)
    #election_data = jsonSerializer.serialize(Election.objects.all().order_by('id'))
    #election_data = json.loads(election_data)
    #election_ids = map(lambda data: int(data["id"]), election_data)

    ## Grab all candidates in the above elections
    #candidate_data = jsonSerializer.serialize(Candidate.objects.filter(election__in=election_ids).order_by('election'))
    #candidate_data = json.loads(candidate_data)
    #candidate_ids = map(lambda data: int(data["id"]), candidate_data)

    ## Create a dictionary of approved votes
    #votes = Vote.objects.filter(candidate__in=candidate_ids, election__in=election_ids)
    #approval_votes = {}
    #for vote in votes:
        #approval_votes["%s,%s" % (vote.election_id, vote.candidate_id)] = vote.approval
        #approval_votes["%d" % vote.election_id] = True

    ## Create the data structure to send up to frontend
    #app_json = []
    #for election in election_data:
        ## Add the voted and candidate attributes to every election
        #election["voted"] = False
        #if int(election["id"]) in approval_votes:
            #election["voted"] = True
        #election["candidates"] = []

        ## Append to app_json
        #app_json.append(election)
        #for candidate in candidate_data:
            ## Dont bother adding candidate if not relevant to current election
            #if int(candidate["election"]["pk"]) != int(election["id"]):
                #continue

            ## Add approved attribute
            #approved = False
            #try:
                #approved = approval_votes["%s,%s" % (election["id"], candidate["id"])]
            #except:
                #pass
            #candidate["approved"] = approved

            ## Append candidate to list
            #app_json[-1]["candidates"].append(candidate)
    #app_json = SafeString(json.dumps(app_json))
