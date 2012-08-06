from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Uncomment to enable django admin:
    # url(r'^admin/', include(admin.site.urls)),
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Examples:
    # url(r'^$', 'openvote.views.home', name='home'),
    # url(r'^openvote/', include('openvote.foo.urls')),
    url(r'^$', 'openvote.views.home', name='home'),
    url(r'^login$', 'openvote.views.login', name='login'),

    url(r'', include('social_auth.urls')),





)

urlpatterns += staticfiles_urlpatterns()