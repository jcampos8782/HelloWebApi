# Runs a temporary consul container which populates the kv store of a running
# consul container. Should be run as a part of a cluster as a dependency of
# the consul agent

# Sort of a hack, but hey... this is just for fun :)
FROM consul:1.6.2 as consul
COPY values.json /tmp
ENV CONSUL_HTTP_ADDR http://consul:8500
CMD ["consul", "kv", "import", "@/tmp/values.json" ]
