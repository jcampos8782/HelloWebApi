Runs a temporary consul container which populates the kv store of a running
consul container. Should be run as a part of a cluster as a dependency of
the consul agent

To add or change secrets, you may either export the kv store from your consul
host and replace the `values.json` file here or update the file directly.
