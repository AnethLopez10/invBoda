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

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY shared ./shared
COPY src/data/guestList.js ./src/data/guestList.js
COPY --from=builder /app/dist ./dist

ENV PORT=8080
ENV GOOGLE_SHEET_ID=1YUC5tefU6Cuq6WaR-75Mua_L6mn4NahGH0_jAcUwy6Q

EXPOSE 8080

CMD ["node", "server/index.js"]
