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
  components: {
    home: {
      about: {
        title: 'Jason D. Campos',
        subtitle: 'Software Solutions Architect',
        content: [
          `I began writing code over 20 years ago. It all started with simple HTML web pages
          during my teenage years, evolved into writing Flash movies in the early 2000s,
          and eventually led me to earn a Bachelor's of Science degree in Computer Science
          from San Jose State University. I graduated in Cum Laude with a 3.84 GPA.`,

          `My professional career has been spent working primarily in medical software -- specifically,
          electronic health records (EHR). I have experience at every level of the application stack and
          in every facet of the deployment pipeline. I can debug your SQL queries, modify your React UI,
          and deploy your application onto a Kubernetes cluster in the cloud.`,

          `I am always looking for new and exciting things to work on. Please contact me via LinkedIn or email
          if you have a cool project in mind. Also, check out my GitHub projects for code samples or just to
          see what I've been working on lately.`,
        ]
      },
      amazonCertification: {
        title: "Amazon Certified Cloud Practictioner",
        subtitle: "81M48L42FM41Q59K",
        media: "/images/aws-cloud-practitioner.png",
        badgeUrl: "https://www.certmetrics.com/amazon/public/badge.aspx?i=9&t=c&d=2020-01-21&ci=AWS01240931",
        validationUrl: "https://aw.certmetrics.com/amazon/public/verification.aspx",
        content: [
          `I have earned my Amazon Cloud Practitioner certification and hope to complete my Amazon
          Solutions Architect and Amazon Developer Associate certifications in 2020.`
        ]
      }
    },
    drawer: {
      anchor: 'left',
      items: [
        {
          title: "Main Menu",
          items: [
            {
              id: 'home',
              text: 'About Me',
              avatar: 'https://avatars0.githubusercontent.com/u/3411401?s=400&u=bd10458dbf4bc6011a4de3a0adbb62d274a69a83&v=4',
              type: 'route',
              location: '/'
            }
          ]
        },
        {
          title: 'Sample Gallery',
          items: [
            {
              id: 'todo',
              text: 'To Do List',
              avatar: '/images/list.png',
              type: 'route',
              location: '/todo'
            },
            {
              id: 'aws',
              text: 'AWS Catalog',
              avatar: 'https://d0.awsstatic.com/logos/powered-by-aws-white.png',
              type: 'route',
              location: '/aws'
            }
          ]
        },
      ]
    }
  },
  modals: {
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
  }
}
