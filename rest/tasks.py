from celery import task
import os
import redis

from django.core import serializers

from openvote.models import Voter

r_host = os.environ['REDIS_HOST']
r_port = os.environ['REDIS_PORT']
r_password = os.environ['REDIS_PASSWORD']
r = redis.StrictRedis(host=r_host, port=int(r_port), db=0, password=r_password)

@task()
def add(x, y):
    return x + y

@task()
def get_voters(*args, **kwargs):
    api_response = serializers.serialize('json',
                        Voter.objects.all())
    kwargs['api_response'] = api_response
    r.publish(channel="default", message=api_response)
