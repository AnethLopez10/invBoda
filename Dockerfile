FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js postcss.config.js tailwind.config.js ./
COPY scripts ./scripts
COPY public ./public
COPY src ./src

ARG VITE_INVITATION_URL=https://bodaoym.zeabur.app/
ENV VITE_INVITATION_URL=$VITE_INVITATION_URL

RUN npm run optimize-images \
    && rm -f public/images/novios/*.jpg \
    && npx vite build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
