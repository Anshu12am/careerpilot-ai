# =========================
# Stage 1: Build Frontend
# =========================

FROM node:20-alpine AS frontend-build

WORKDIR /frontend

COPY Frontend/package*.json ./

RUN npm install

COPY Frontend/ .

RUN npm run build


# =========================
# Stage 2: Backend
# =========================

FROM node:20-alpine

WORKDIR /app

COPY Backend/package*.json ./

RUN npm install --omit=dev

COPY Backend/ .

# Copy React production build
COPY --from=frontend-build /frontend/dist ./Frontend/dist

EXPOSE 3000

CMD ["npm", "start"]