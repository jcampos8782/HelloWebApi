Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-18.04"
  config.vm.network "forwarded_port", guest: 80, host: 8000, host_ip: "127.0.0.1"
  chef_repo_path = "./chef"
  config.vm.provision :chef_solo do |chef|
    chef.arguments = '--chef-license=accept'
    chef.data_bags_path = 'chef/data_bags'
    chef.environments_path = 'chef/environments'
    chef.roles_path = 'chef/roles'
    chef.cookbooks_path = 'chef/cookbooks'

    chef.run_list = [
        'recipe[servers::docker]'
    ]
  end
end
