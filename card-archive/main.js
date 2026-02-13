// ── Build the deck ──────────────────────────────────
const deck = document.getElementById('deck');
const shuffleBtn = document.getElementById('shuffleBtn');

function buildDeck() {
  deck.innerHTML = '';
  CARD_GAMES.forEach((game, i) => {
    const suitSymbol = SUIT_SYMBOLS[game.suit];
    const suitColor  = SUIT_COLORS[game.suit];

    const container = document.createElement('div');
    container.className = 'card-container';
    container.style.animationDelay = `${i * 0.08}s`;
    container.dataset.gameId = game.id;

    container.innerHTML = `
      <div class="card">
        <div class="card-face card-back"></div>
        <div class="card-face card-front" style="color: ${suitColor}">
          <div class="card-corner top">
            <span class="card-rank">${game.rank}</span>
            <span class="card-suit-small">${suitSymbol}</span>
          </div>
          <div class="card-center">
            <span class="card-big-suit" style="color: ${suitColor}">${suitSymbol}</span>
            <span class="card-game-name" style="color: ${game.color}">${game.name}</span>
            <span class="card-desc">${game.description}</span>
            <span class="card-play-hint">&#9654; click to explore</span>
          </div>
          <div class="card-corner bottom">
            <span class="card-rank">${game.rank}</span>
            <span class="card-suit-small">${suitSymbol}</span>
          </div>
        </div>
      </div>
    `;

    // 3D tilt on mouse move
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY_tilt = ((x - centerX) / centerX) * 12;
      // Only apply tilt when NOT hovered-flipped; otherwise the flip handles rotateY
      container.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY_tilt}deg) scale(1.06)`;
    });

    container.addEventListener('mouseleave', () => {
      container.style.transform = '';
    });

    // Click → navigate to game page
    container.addEventListener('click', () => {
      // Flip-out animation
      container.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
      container.style.transform = 'scale(1.2) rotateY(360deg)';
      container.style.opacity = '0';
      setTimeout(() => {
        window.location.href = `games/${game.id}.html`;
      }, 400);
    });

    deck.appendChild(container);
  });
}

// ── Shuffle ─────────────────────────────────────────
function shuffle() {
  const cards = [...deck.querySelectorAll('.card-container')];
  // Random reorder in DOM
  const shuffled = cards.sort(() => Math.random() - 0.5);
  shuffled.forEach((card, i) => {
    card.classList.remove('shuffling');
    // Force reflow
    void card.offsetWidth;
    card.style.animationDelay = `${i * 0.05}s`;
    card.classList.add('shuffling');
    deck.appendChild(card);
  });
  // Remove class after animation
  setTimeout(() => {
    cards.forEach(c => c.classList.remove('shuffling'));
  }, 1000);

  burstParticles();
}

shuffleBtn.addEventListener('click', shuffle);

// ── Particle effects ────────────────────────────────
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y) {
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3 - 1;
    this.life = 1;
    this.decay = 0.008 + Math.random() * 0.015;
    this.size = 2 + Math.random() * 4;
    this.color = ['#d4a843', '#fff', '#e74c3c', '#ffd700'][Math.floor(Math.random() * 4)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.02; // gravity
    this.life -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Ambient floating particles
function spawnAmbient() {
  if (particles.length < 30) {
    const p = new Particle();
    p.vy = -0.3 - Math.random() * 0.5;
    p.vx = (Math.random() - 0.5) * 0.5;
    p.decay = 0.003;
    p.size = 1 + Math.random() * 2;
    p.color = 'rgba(212,168,67,0.5)';
    particles.push(p);
  }
}

function burstParticles() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  for (let i = 0; i < 60; i++) {
    const p = new Particle(cx + (Math.random() - 0.5) * 300, cy + (Math.random() - 0.5) * 200);
    p.vx = (Math.random() - 0.5) * 8;
    p.vy = (Math.random() - 0.5) * 8;
    particles.push(p);
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spawnAmbient();
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

// ── Boot ────────────────────────────────────────────
buildDeck();
animateParticles();

// Initial shuffle effect on load
setTimeout(shuffle, 800);
