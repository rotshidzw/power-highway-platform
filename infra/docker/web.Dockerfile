FROM node:20-alpine

WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate
RUN pnpm install

WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "dev"]
