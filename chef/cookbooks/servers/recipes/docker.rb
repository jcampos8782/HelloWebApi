# Installs docker-ce and docker-compose on the target Ubuntu host

# Cookbook:: servers
# Recipe:: docker
#
# Copyright:: 2020, Jason Campos, All Rights Reserved.

package 'apt-transport-https'
package 'ca-certificates'
package 'curl'
package 'software-properties-common'

bash 'add_docker_gpg' do
  code <<-BASH
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) \
      stable"

    apt-get update
  BASH
end

package 'docker-ce'
package 'docker-compose'
