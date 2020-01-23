/*
  This file should be a flat json file called properties.json or config.json or something
  to that extent. However, create-react-app comes with webpack already preconfigured
  and ignores webpack.config.json in the project root. For now, leave this here.
*/
export default
{
  title: '.NET Core + ReactJS w/ Material-UI',
  theme: 'dark',
  todoList: {
    apiEndpoint: `${process.env.REACT_APP_BASE_URL}/api/todoitems`,
    heading: 'To-Do List',
    hintText: 'Don\'t forget to...',
  },
  awsServiceCatalog: {
    apiEndpoint: `${process.env.REACT_APP_BASE_URL}/api/services`,
    heading: 'AWS Service Catalog',
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
      title: 'Software Solutions Architect',
      description: [
        `I have been writing code for over twenty years. I began by creating small websites for
          my gaming clans as a teenager and eventually earned by Bachelor's degree in Computer Science
          from San Jose State University, earning a Cum Laude distinction with a 3.89 GPA.`,

        `I have worked professionally as a full stack application developer for over ten years,
          primarily working with healthcare software. I have experience with dozens of different
          types of technologies from all levels of the application stack, from RDBMS to UI to
          configuration management to deployment and containerization.`,

        `Please visit my LinkedIn profile, Github page, or send me an e-mail if you would like
          to get in contact for any reason.`,
      ]
    },
    copyright: {
      holder: 'Jason D. Campos',
    },
    technologies: {
      title: 'Powered By',
      sections: [
        {
          title: 'Front End',
          items: [
            {
              name: 'ReactJS',
              url: 'http://reactjs.org',
            },
            {
              name: 'Material-UI',
              url: 'http://material-ui.com',
            },
            {
              name: 'Sass',
              url: 'http://sass-lang.com',
            },
          ]
        },
        {
          title: 'Back End',
          items: [
            {
              name: '.NET Core',
              url: 'https://docs.microsoft.com/en-us/dotnet/core/'
            },
            {
              name: 'MySQL',
              url: 'https://www.mysql.com/'
            },
            {
              name: 'Spring Boot',
              url: 'https://spring.io/projects/spring-boot'
            }
          ]
        },
        {
          title: 'Infrastructure & Monitoring',
          items: [
            {
              name: "AWS",
              url: "http://aws.amazon.com",
            },
            {
              name: 'Docker',
              url: 'http://docker.io',
            },
            {
              name: 'Kubernetes',
              url: 'http://kubernetes.io'
            },
            {
              name: 'Elastic',
              url: 'http://elastic.co',
            },
            {
              name: 'RabbitMQ',
              url: 'http://www.rabbitmq.com'
            },
            {
              name: 'Consul',
              url: 'http://www.consul.io'
            }
          ]
        },
      ]
    }
  },
  drawer: {
    anchor: 'left',
    open: false,
    items: [
      {
        title: "Admin",
        items: [
          {
            id: 'kibana',
            text: 'Kibana',
            subtext: 'Monitoring & Dashboards',
            location: `${process.env.REACT_APP_TODO_URL}`,
            avatar: '/images/elastic/color/logo-kibana-64-color.svg'
          },
          {
            id: 'consul',
            text: 'Consul',
            subtext: 'Configuration management',
            location: `${process.env.REACT_APP_TODO_URL}/ui`,
            avatar: '/images/hashicorp/consul/Logos/SVG/Vertical Logos/Full Color/Consul_VerticalLogo_FullColor.svg',
          },
          {
            id: 'rmq',
            text: 'RabbitMQ',
            subtext: 'Event Queue',
            location: `${process.env.REACT_APP_TODO_URL}`,
            avatar: '/images/rabbitmq.svg',
          },
        ]
      }
    ]
  }
}
