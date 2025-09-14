# Levelify -> Gamifique sua vida e suba de nivel com bons habitos. 
O Levelify é uma plataforma de gerenciamento de tarefas, habitos e ferramentas de produtividade, agregando uma gama de recursos para incentivar a evolução do usuario (o jogador). Cada ação no sistema gera uma recompensa, e espera-se que com isso, uma motivação. O obejtivo final do sistema é fornecer suporte ao jogador para a contrução de uma rotina mais saudavel e organizada, substituíndo as recompensas faceis da vida moderna como as redes sociais.


# Sobre o projeto -> 

Esse projeto é uma projeto feito para estudo e aplicação de uma grande variedade de tecnicas, metodologias, ferramentas e conhecimentos adquiridos durante a minha formação como desenvolvedor backend, com foco na minha bagagem utilizando o NodeJS.

Esse projeto tem como base a aplicação de conceitos desde o basico do desenvolvimento de APIs Rest dentro de um Framework no Node até o avançado, com o planejamento da arquitetura utilizando conceitos de Clean Architecture, boas praticas de Clean Code e Solid.

A ideia com esse projeto é criar um portifolio unificado de tecnicas que aprendi durante a minha formação até agora, concluíndo a trilha de Node da Rocketseat e também desenvolver um projeto pessoal com referencias que eu gosto (animes -> com foco em solo leveling) e como uma solução para resolver o problema de eventuais baixas de produtividade e organização, criando um hub de ferramentas para gerenciamento de tarefas e habitos, bem como recursos de foco Pomodoro e Flowmodoro, exercitando a logica aplicando regras de negocio direcionadas a gamificação da plataforma.

Um dos primeiros projetos que participei na Universidade Federal do Ceará tinha como objetivo desenvolver uma ferramenta para aprendizado com gamificação, o projeto foi eventualemente descontinuado sem uma versão final, e na epoca eu não tinha tanto conhecimento tecnico ainda, mas com certeza foi uma experiencia incrivel que me fez amar trabalhar com desenvolvimento. Então aqui ficam os meus agradecimentos a Codeplay/Arandu e ao Professor Doutor Ítalo Linhares de Araújo pelas inspirações, aprendizados e apoio.

# Etapas do desenvolvimento e o que eu aprendi e reforcei em cada uma delas.

- Durante a primeira etapa do desenvolvimento eu desenvolvi a camada de Dominio da minha aplicação, aprendendo os conceitos iniciais da Clean Architecture, sobre como criar toda a logica da aplicação completamente independente de ferramentas externas. Aqui eu desenvolvi minhas entidades, value-objects para essas entidades, eventos relacionados a ações do usuario dentro da aplicação, casos de uso para cada uma das funcionalidades da aplicação (planejadas ate o momento), repositorios e a parte fundamental da minha aplicação com handlers de erro funcionais, tipos utilitarios, interfaces utilitarias, e as implementações base das entidades, erros e eventos da minha aplicação.

- Ainda durante essa etapa de trabalho na camada de Dominio, apliquei tecnicas de teste unitarios para verificar e validar o funcionamento dos casos de uso da minha aplicação e executa-los em busca de eventuais erros. Utilizei o vitest para escrever os testes e fiz implementações concretas dos meus repositorios em memoria para servirem como um mock para o meu banco de dados.

- Para finalizar os trabalhos iniciais na camada de Dominio eu tambem criei um subdominio de suporte, com entidades, casos de uso e repositorios relacionados a notificações, de forma independente do dominio de habbit tracker, e fiz a comunicação entre ambos com eventos utilizando uma estrategia de publish/subscriber.

- Após isso eu segui para o desenvolvimento da camada de Infraestrutura da aplicação, onde eu comecei a prepara o NestJS para receber a logica base da minha aplicação e utilizar ela em ferramentas externas, como o PrismaORM para a persistencia de dados no banco de dados PostgreSQL, rodando em Docker com o docker compose. Além disso, implementei a logica de autenticação com tokens de acesso utilizando JSON Web Token (JWT) com um algoritmo RS256 para permitir que eventualemente, a integração de microserviços possa ser feita de forma que a chave publica possa ser compartilhada com estes de forma segura, sem comprometer a integridade da segurança do meu sistema. Ademais, criei os primeiros modulos, para gerenciar a injeção de dependencias na aplicação com os controllers e providers de Http, Autenticação, com a estrategia de assinatura de token com o par de chaves publica e privada, e os repositorios e serviços do Prisma no DB.
