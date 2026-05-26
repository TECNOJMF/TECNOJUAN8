console.log("sitio.js cargado");

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    header.style.top = "-100px";
  } else {
    header.style.top = "0";
  }

  lastScroll = currentScroll;
});

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // CHATBOT (AGREGADO SIN MODIFICAR TU JS)
  // ==============================

  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const closeChat = document.getElementById("closeChat");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");

  if (chatToggle && chatBox && closeChat && chatMessages && chatInput) {

    chatBox.style.display = "none";

    chatToggle.addEventListener("click", () => {
      chatBox.style.display = "flex";
      chatInput.focus();
    });

    closeChat.addEventListener("click", () => {
      chatBox.style.display = "none";
    });

    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    window.sendMessage = function () {
      const message = chatInput.value.trim();
      if (!message) return;

      addMessage(message, "user");
      chatInput.value = "";

      setTimeout(() => {
        addMessage(generateResponse(message), "bot");
      }, 400);
    };

    function addMessage(text, type) {
      const div = document.createElement("div");
      div.className = type === "user" ? "user" : "bot";
      div.textContent = text;

      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateResponse(input) {
      const text = input.toLowerCase();

      if (text.includes("hola")) return "👋 ¡Hola! Bienvenido a TecnoJuan.web.";
      if (text.includes("curso")) return "📚 Ve a la sección Tutorial.";
      if (text.includes("html")) return "💻 HTML es la base de la web.";
      if (text.includes("video")) return "🎥 Mira la sección de videos.";
      if (text.includes("contacto")) return "📧 tecnobarca2015@gmail.com";

      return "🤖 No entendí tu pregunta.";
    }
  }
    // ==============================
  // 💬 COMENTARIOS FIREBASE (TU CÓDIGO SIN TOCAR)
  // ==============================

  const form = document.getElementById("commentForm");
  const commentsList = document.getElementById("commentsList");

  if (!form || !commentsList) return;

  const COLLECTION = "comments";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const comment = document.getElementById("commentText").value;

    try {
      await window.addDoc(window.collection(window.db, COLLECTION), {
        username,
        comment,
        createdAt: new Date()
      });

      form.reset();
      loadComments();

    } catch (error) {
      console.error("Error al guardar comentario:", error);
    }
  });

  async function loadComments() {
    try {
      const snapshot = await window.getDocs(
        window.collection(window.db, COLLECTION)
      );

      commentsList.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();

        const div = document.createElement("div");
        div.classList.add("comment");

        div.innerHTML = `
          <strong>${data.username}</strong>
          <p>${data.comment}</p>
        `;

        commentsList.appendChild(div);
      });

    } catch (error) {
      console.error("Error cargando comentarios:", error);
    }
  }

  loadComments();
});
