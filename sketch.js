let fazendeiro, engenheiro;
let sementes = [];
let equipamentos = [];
let fimDeJogo = false;
let missaoFazendeiro = false;
let missaoEngenheiro = false;

function setup() {
  createCanvas(800, 600);
  fazendeiro = new Personagem(100, height - 100, 'campo');
  engenheiro = new Personagem(width - 100, height - 100, 'cidade');
  
  // Criando sementes espalhadas pelo campo para o fazendeiro pegar
  for (let i = 0; i < 5; i++) {
    sementes.push(createVector(random(150, width - 150), random(height / 2 + 50, height - 50)));
  }

  // Criando equipamentos espalhados pela cidade para o engenheiro pegar
  for (let i = 0; i < 5; i++) {
    equipamentos.push(createVector(random(150, width - 150), random(50, height / 2 - 50)));
  }
}

function draw() {
  if (fimDeJogo) {
    showFinalScreen();
    return;
  }

  // Tela verde para o campo
  background(34, 139, 34); // Cor verde para o campo

  // Desenho da cidade com fundo azul claro
  fill(135, 206, 235); // Azul claro para a cidade
  rect(0, 0, width, height / 2); // Cidade (parte superior da tela)

  // Desenho do campo com fundo verde
  fill(34, 139, 34); // Verde para o campo
  rect(0, height / 2, width, height / 2); // Campo (parte inferior da tela)

  // Mostrar as sementes e equipamentos
  mostrarItens(sementes, 'semente');
  mostrarItens(equipamentos, 'equipamento');

  // Mostrar os personagens (fazendeiro e engenheiro)
  fazendeiro.show();
  engenheiro.show();

  // Checar se os personagens se encontraram e terminaram suas missões
  if (dist(fazendeiro.x, fazendeiro.y, engenheiro.x, engenheiro.y) < 50 && missaoFazendeiro && missaoEngenheiro) {
    fill(0);
    textSize(20);
    text('Missões completas! A cidade e o campo se conectaram!', width / 2 - 150, 50);
    fimDeJogo = true; // Termina o jogo após a conclusão
  }

  desenharNuvens();
}

function keyPressed() {
  // Movimento do fazendeiro com as setas
  if (keyCode === LEFT_ARROW) {
    fazendeiro.move(-10, 0);
  } else if (keyCode === RIGHT_ARROW) {
    fazendeiro.move(10, 0);
  } else if (keyCode === UP_ARROW) {
    fazendeiro.move(0, -10);
  } else if (keyCode === DOWN_ARROW) {
    fazendeiro.move(0, 10);
  }

  // Movimento do engenheiro com W, A, D e C
  if (key === 'a' || key === 'A') {
    engenheiro.move(-10, 0);
  } else if (key === 'd' || key === 'D') {
    engenheiro.move(10, 0);
  } else if (key === 'w' || key === 'W') {
    engenheiro.move(0, -10);
  } else if (key === 'c' || key === 'C') {
    engenheiro.move(0, 10);
  }
}

function mostrarItens(itens, tipo) {
  for (let i = itens.length - 1; i >= 0; i--) {
    let item = itens[i];
    fill(tipo === 'semente' ? 255 : 139, tipo === 'semente' ? 255 : 0, 0); // Cor diferente para sementes e equipamentos
    ellipse(item.x, item.y, 20, 20);
    
    // Verificar se o personagem passou por cima do item
    if (dist(fazendeiro.x, fazendeiro.y, item.x, item.y) < 20 && tipo === 'semente') {
      sementes.splice(i, 1); // Remove a semente coletada
      missaoFazendeiro = true; // Missão do fazendeiro completa
      textSize(15);
      fill(0);
      text("Fazendeiro coletou sementes!", fazendeiro.x, fazendeiro.y - 30);
    }

    if (dist(engenheiro.x, engenheiro.y, item.x, item.y) < 20 && tipo === 'equipamento') {
      equipamentos.splice(i, 1); // Remove o equipamento coletado
      missaoEngenheiro = true; // Missão do engenheiro completa
      textSize(15);
      fill(0);
      text("Engenheiro instalou equipamentos!", engenheiro.x, engenheiro.y - 30);
    }
  }
}

function desenharNuvens() {
  fill(255, 255, 255, 150); // Cor branca e opaca para nuvens
  ellipse(150, 100, 150, 80);
  ellipse(400, 200, 200, 100);
  ellipse(600, 50, 180, 90);
}

function showFinalScreen() {
  background(255);
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Como o campo ajuda a cidade:", width / 2, height / 2 - 50);

  textSize(18);
  text("A produção agrícola fornece alimentos essenciais para a população urbana.", width / 2, height / 2);
  text("Além disso, a tecnologia aplicada no campo melhora a eficiência da produção.", width / 2, height / 2 + 30);
  text("Com essa colaboração, todos saem ganhando!", width / 2, height / 2 + 60);
}

class Personagem {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  show() {
    if (this.tipo === 'campo') {
      // Desenho do fazendeiro
      fill(139, 69, 19); // Corpo
      ellipse(this.x, this.y, 50, 50);

      fill(0); // Chapéu
      triangle(this.x - 25, this.y - 30, this.x + 25, this.y - 30, this.x, this.y - 60);

      fill(255, 223, 186); // Cabeça
      ellipse(this.x, this.y - 20, 30, 30);

      fill(0); // Olhos
      ellipse(this.x - 10, this.y - 25, 5, 5);
      ellipse(this.x + 10, this.y - 25, 5, 5);
    } else if (this.tipo === 'cidade') {
      // Desenho do engenheiro
      fill(70, 130, 180); // Corpo
      rect(this.x - 25, this.y - 25, 50, 50);

      fill(255, 223, 186); // Cabeça
      ellipse(this.x, this.y - 25, 30, 30);

      fill(255, 215, 0); // Capacete
      arc(this.x, this.y - 40, 35, 35, PI, 0, CHORD);

      fill(0); // Olhos
      ellipse(this.x - 10, this.y - 30, 5, 5);
      ellipse(this.x + 10, this.y - 30, 5, 5);
    }
  }
}
