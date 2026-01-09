FROM node:20-alpine

WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate
RUN pnpm install
RUN pnpm -C packages/db prisma generate

WORKDIR /app/apps/api
EXPOSE 3001
CMD ["pnpm", "dev"]
