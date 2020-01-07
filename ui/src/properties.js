export default
{
  title: '.NET Core + ReactJS w/ Material-UI',
  theme: 'dark',
  todoList: {
    apiEndpoint: 'http://192.168.86.31:5000/api/todoitems',
    heading: 'To-Do List',
    hintText: 'Don\'t forget to...',
  },
  contact: {
    name: 'Jason D. Campos',
    email: 'jcampos8782@gmail.com',
    linkedin: 'http://linkedin.com/in/json-campos',
    github: 'http://github.com/jcampos8782',
  },
  avatars: {
    default: 'https://avatars0.githubusercontent.com/u/3411401?s=400&u=bd10458dbf4bc6011a4de3a0adbb62d274a69a83&v=4',
    github: 'https://avatars0.githubusercontent.com/u/3411401?s=400&u=bd10458dbf4bc6011a4de3a0adbb62d274a69a83&v=4',
    google: 'https://lh3.googleusercontent.com/a-/AAuE7mCnJ3Z-BcKPhpfpDhFae_APhXcNZ5Fd3_QTm4M-eA=s96-cc-rg',
    linkedin: 'https://media.licdn.com/dms/image/C5603AQHCKGEgAMNVRA/profile-displayphoto-shrink_200_200/0?e=1583971200&v=beta&t=7QAydTm6EwbMY_IUTHIIqUPF1K-16JE8kTMx0mRftUY',
  },
  modals: {
    about: {
      'text': 'Software Solutions Architect'
    }
  },
  drawer: {
    anchor: 'left',
    items: [
      {
        title: "Admin",
        items: [
          {
            id: 'kibana',
            text: 'Kibana',
            subtext: 'Monitoring & Dashboards',
            location: 'http://localhost:5601',
            avatar: '/images/elastic/color/logo-kibana-64-color.svg'
          },
          {
            id: 'consul',
            text: 'Consul',
            subtext: 'Configuration management',
            location: 'http://localhost:8500/ui',
            avatar: '/images/hashicorp/consul/Logos/SVG/Vertical Logos/Full Color/Consul_VerticalLogo_FullColor.svg',
          },
          {
            id: 'rmq',
            text: 'RabbitMQ',
            subtext: 'Event Queue',
            location: 'http://localhost:15672',
            avatar: '/images/rabbitmq.svg',
          }
        ]
      }
    ]
  }
}
