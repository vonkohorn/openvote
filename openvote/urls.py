from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = patterns('',
    url(r'^$', 'openvote.views.home', name='home'),
    url(r'^login$', 'openvote.views.login', name='login'),
    url(r'^logout$', 'openvote.views.logout', name='logout'),

    # Include our OAuth urls
    url(r'', include('social_auth.urls')),
)

# Allow serving static files locally, for now.
# TODO: Put static files on CDN/S3
urlpatterns += staticfiles_urlpatterns()