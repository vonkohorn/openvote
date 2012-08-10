from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = patterns('',
    url(r'^$', 'openvote.views.home', name='home'),
    url(r'^logout$', 'openvote.views.logout', name='logout'),
    
#    url(r'^elections/$', 'elections.views.index'),                              # nav = sorted elections list
#    url(r'^elections/new/$', 'elections.views.edit'),
#    url(r'^elections/(?P<election_id>\d+)/edit/$', 'elections.views.edit'),
#    url(r'^elections/(?P<election_id>\d+)/$', 'elections.views.detail'),

#    url(r'^candidates/(?P<candidate_id>\d+)/$', 'candidates.views.detail'),
#    url(r'^candidates/(?P<candidate_id>\d+)/vote/$', '... just a post?...'),


    # Include our OAuth urls
    url(r'', include('social_auth.urls')),

    # url(r'^admin/', include(admin.site.urls)),
)

# Allow serving static files locally, for now.
# TODO: Put static files on CDN/S3
urlpatterns += staticfiles_urlpatterns()
