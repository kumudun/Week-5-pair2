# Backend and Proxy Insights

## 1. What does this code accomplish?
- `virtuals: true` - This tells Mongoose to include virtual fields when converting a MongoDB document into JSON.
- `transform: (doc, ret) => { ret.id = ret._id; }` - It adds a new field called id, which is simply a copy of ret._id
- The returned JSON object will now show both


{
  "id": "672abc123...",
  "_id": "672abc123..."
}



## Why is this useful in your application?
- `items.map(item => <div key={item.id}>{item.title}</div>);` - Frontend convenience
- Cleaner API responses
- Better compatibility with libraries

## 2. What is CORS?
- CORS (Cross-Origin Resource Sharing) is a security feature built into web browsers.
It controls whether a web page from one domain is allowed to make requests to a server on a different domain.
Example of two different origins:

Frontend: http://localhost:3000

Backend: http://localhost:4000

Because the ports are different, the browser considers them different origins.

By default, browsers block such requests for security reasons.

## Why is this middleware necessary?
- Your React frontend sends API requests to your Node/Express backend.
Since they run on different ports, the browser treats it as a cross-origin request and blocks it unless the backend explicitly allows it.

## 3. How does this proxy setting work?
- When your frontend (React + Vite) makes a request to something like:
     /api/jobs
     /api/users
     /api/login

- The Vite development server intercepts this request and forwards it to your backend:
   http://localhost:4000/api/jobs

- The browser thinks it is calling the same server (because the request starts with /api), but Vite secretly redirects it to the backend.

So the frontend can simply do:`fetch("/api/jobs");` without needing the full backend URL.  

## What problems does this solve?
- CORS problems during development

Normally, the frontend runs on:`http://localhost:5173`´and the backend runs on:`http://localhost:4000`
Because these are different origins, the browser blocks requests (CORS issue).

- Cleaner API calls

Without a proxy, you would need to write:`fetch("http://localhost:4000/api/jobs");`With the proxy, you can simply write:`fetch("/api/jobs");`
This makes your code cleaner and easier to maintain.

- Easy environment switching
       - In development: Vite proxy → localhost:4000
       - In production: You can point /api to your deployed backend

