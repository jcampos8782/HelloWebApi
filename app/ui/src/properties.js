/*
  This file should be a flat json file called properties.json or config.json or something
  to that extent. However, create-react-app comes with webpack already preconfigured
  and ignores webpack.config.json in the project root. For now, leave this here.
*/
import routes from './routes';
import services from './services';

const defaultTheme = 'dark';

const contacts = {
  name: 'Jason D. Campos',
  email: 'jcampos8782@gmail.com',
  linkedin: 'http://linkedin.com/in/json-campos',
  github: 'http://github.com/jcampos8782',
  blog: 'http://blog.jsoncampos.com'
};

const avatars = {
    aws: 'https://d0.awsstatic.com/logos/powered-by-aws-white.png',
    main: 'https://avatars0.githubusercontent.com/u/3411401?s=400&u=bd10458dbf4bc6011a4de3a0adbb62d274a69a83&v=4',
    github: 'https://avatars0.githubusercontent.com/u/3411401?s=400&u=bd10458dbf4bc6011a4de3a0adbb62d274a69a83&v=4',
    google: 'https://lh3.googleusercontent.com/a-/AAuE7mCnJ3Z-BcKPhpfpDhFae_APhXcNZ5Fd3_QTm4M-eA=s96-cc-rg',
    linkedin: 'https://media.licdn.com/dms/image/C5603AQHCKGEgAMNVRA/profile-displayphoto-shrink_200_200/0?e=1583971200&v=beta&t=7QAydTm6EwbMY_IUTHIIqUPF1K-16JE8kTMx0mRftUY'
};

const apps = {
  todo: {
    title: "To Do List",
    route: routes.todo,
    avatar: '/images/list.png',
    config: {
      avatar: '/images/list.png',
      github: 'https://github.com/jcampos8782/HelloWebApi/tree/master/services/ToDoList',
      title: 'To-Do List',
      hintText: 'Don\'t forget to...',
      endpoint: services.todo.endpoint,
    }
  },
  aws: {
    title: "AWS Catalog",
    route: "/aws",
    avatar: avatars.aws,
    config: {
      avatar: avatars.aws,
      github: 'https://github.com/jcampos8782/HelloWebApi/tree/master/services/AwsServiceCatalog',
      title: 'AWS Service Catalog',
      hintText: 'Search Amazon Services',
      endpoint: services.aws.endpoint
    }
  }
};

export default
{
  theme: defaultTheme,
  routes: routes,
  services: services,
  contact: contacts,
  avatars: avatars,

  components: {
    home: {
      content: [
        {
          title: 'Jason D. Campos',
          subtitle: 'Software Solutions Architect',
          avatar: avatars.main,
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
          ],
          actions: [
              {
                text: 'Check Out My Github',
                type: 'link',
                location: contacts.github
              },
              {
                text: 'Endorse Me on LinkedIn',
                type: 'link',
                location: contacts.linkedin
              }
          ]
        },
        {
          title: "Amazon Certified Cloud Practictioner",
          subtitle: "#81M48L42FM41Q59K",
          avatar: "https://d0.awsstatic.com/logos/powered-by-aws-white.png",
          content: [
            `I have been using Amazon Web Services both professionally and privately for nearly a decade. I
            recently became an Amazon Certified Cloud Practitioner, passing the exam with a 969/1000 score.`,
            `I am currently studying to become an Amazon Certified Solutions Architect and Amazon Certified Developer
            Associate. I hope to have both credentials completed by the end of 2020.`
          ],
          actions: [
            {
              text: 'View My Badge',
              type: 'link',
              location: 'https://www.certmetrics.com/amazon/public/badge.aspx?i=9&t=c&d=2020-01-21&ci=AWS01240931',
            },
            {
              text: 'Verify My Credentials',
              type: 'link',
              location: 'https://aw.certmetrics.com/amazon/public/verification.aspx'
            }
          ]
        },
        {
          title: "Blog Launch",
          avatar: avatars.main,
          content: [
            `I've decided to launch a blog which will chronicle my oh so adventurous life as a Silicon Valley
            Software Engineer. The blog will contain technical articles related to subjects I am studying such
            as well as some stories from the trenches.`,
            `I am currently studying for my AWS Solutions Architect, learning Python, and fiddling with Arduino.
            You can expect some posts on all of those subjects soon.`
          ],
          actions: [
            {
              text: 'Visit my Blog',
              type: 'link',
              location: 'http://blog.jsoncampos.com',
            }
          ]
        }
      ]
    },
    drawer: {
      anchor: 'left',
      groups: [
        {
          title: "Main Menu",
          items: [
            {
              title: 'About Me',
              avatar: avatars.main,
              route: routes.home
            }
          ]
        },
        {
          title: 'Sample Gallery',
          items: [apps.todo, apps.aws]
        },
      ]
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
    },
    todo: apps.todo.config,
    aws: apps.aws.config
  },
}
