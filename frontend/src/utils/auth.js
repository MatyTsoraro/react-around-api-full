class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error just occurred: ${res.status}`);
    }
  }

  register(credentials) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(credentials),
    })
      .then(this.processResponse)
      .then((data) => {
        return fetch(`${this.baseUrl}/signin`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(credentials),
        })
          .then(this.processResponse)
          .then((res) => {
            localStorage.setItem("jwt", res.token);

            return data;
            // There is no need to run checkToken because data has already returned from registration
          });
      });
  }

  login(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this.processResponse)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return this.checkToken(data.token);
      });
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processResponse);
  }
}

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-around-api-full-five.vercel.app"
    : "http://localhost:3000";

export const auth = new Auth({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
