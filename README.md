
 <h1 align="center"><strong>Labenu System 01 Turma Jemison</b></strong></h1></div>

<h2>Projeto :books:</h2>
<hr>
Labenu System é um projeto de Backend que tem a finalidade de introduzir a lógica da Programação Orientada a Objetos, utilzando os conceitos de Classes, Herança, polimorfismo e também no aprofundamento das estruturas de banco de dados, com algumas tabelas relacionadas de um para muitos e muitos para muitos.

O projeto possui o tema da própria institução Labenu, com a criação de uma estrutura de :school:**turmas**, :man_student:**estudantes** e :man_teacher:**instrutuors** com retornos de diferentes formas entre essas entidades.
<hr>

<h3>Endpoinst do projeto<h3>
<h5>
:yellow_circle: Criar turma :school:
 > Endpoint que recebe através de um "body" apenas o nome da nova turma, antes da confirmação da criação, será verificado se já existe alguma turma cadastrada            anteriormente com o mesmo nome.
</br>

:green_circle: Buscar turmas ativas :school:
>  Endpoint que retorna uma lista com todas as turmas que já iniciaram o curso, portanto estão em um dos seis módulos que o curso possui, ordenados em ordem crescente    do módulo que a turma se encontra.
</br>

:large_blue_circle: Mudar turma de módulo :school:
> Endpoint que drecebe por "path params" o id de uma turma e faz a verificação se a turma existe no banco de dados. Então recebe através da "query" o número do novo módulo, que deverá ser um número de 1 a 6 onde não é possível atribuir o valor de um módulo abaixo do módulo atual.
</br>

:green_circle: ***Buscar todas as pessoas através da turma*** 	:people_holding_hands:
> Endpoint que recebe o id de uma turma através da "query", verifica se a turma existe, então exibe uma relação de todos os instrutores desta turma e uma contendo os estudantes desta turma.
</br>

:yellow_circle: Criar instrutor :man_teacher:
> Endpoint que recebe através de um "body" um nome, um email uma data de nascimento e um array com as especialidades do instrutor, então antes da confirmação da criação, verifica se o email cadastrado já existe no banco de dados e também se as especialidades correspondem às seis especialidade existentes no banco de dados.
</br>

:large_blue_circle: Mudar instrutor de turma :man_teacher:
> Endpoint que recebe através do "path params" o id de um instrutor, fazendo a verificação se está cadastrado no banco de dados. Enãto recebe o nome de uma turma através da "query" fazendo a verificação se a turma existe no banco de dados, antes de atribuir a nova turma ao instrutor.
</br>

:green_circle: Buscar todos os instrutores :man_teacher:
> Endpoint que retorna uma lista com todos os dados dos instrutores, contendo também as especialidades dele.
</br>

:green_circle: Buscar todos os instrutores especialistas em Programação Orientada a Objetos :man_teacher:
>Endpoint que retorna todos os Instruturos que possuem a especialidade de Programação Orientada a Objetos.
</br>

:yellow_circle: Criar estudante :man_student:
> Endpoint que recebe através de um "body" um nome, um email uma data de nascimento e um array com os hobbies de um estudante, fazendo a verificação se o email informado já foi cadastrado anteriormente no banco de dados. Então verifica os hobbies informados, cadastrando aqueles que não correspondem a nenhum hobby cadastrado anteriormente, antes da confirmação da criação do novo estudante.
</br>

:large_blue_circle: Mudar estudante de turma :man_student:
> Endpoint que recebe através do "path params" o id de um estudante, fazendo a verificação se ele está cadastrado no banco de dados. Enãto recebe o nome de uma turma através da "query" fazendo a verificação se a turma existe no banco de dados, antes de atribuir a nova turma ao estudante.
</br>

:green_circle:Buscar estudantes através do nome :man_student:
>Endpoint que recebe através da "query" um termo então retorna todos os estudantes que possuam este termo em qualquer parte do nome ou sobrenome.
</br>

:green_circle: Buscar todas as pessoas docentes

- [x] Mudar docente de turma
