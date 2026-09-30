FROM node:24-bookworm-slim AS build

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @family/helper build

FROM node:24-bookworm-slim AS runner

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NODE_ENV=production

RUN corepack enable && groupadd -r app && useradd -r -g app app
WORKDIR /app

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/apps/helper/package.json ./apps/helper/package.json
COPY --from=build /app/apps/helper/.next ./apps/helper/.next
COPY --from=build /app/apps/helper/next.config.ts ./apps/helper/next.config.ts
COPY --from=build /app/apps/helper/public ./apps/helper/public
COPY --from=build /app/apps/helper/node_modules ./apps/helper/node_modules
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
WORKDIR /app/apps/helper

USER app
EXPOSE 3002

CMD ["./node_modules/.bin/next", "start", "-p", "3002"]
