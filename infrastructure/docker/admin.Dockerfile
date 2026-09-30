FROM node:24-bookworm-slim AS build

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @family/admin build

FROM node:24-bookworm-slim AS runner

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NODE_ENV=production

RUN corepack enable && groupadd -r app && useradd -r -g app app
WORKDIR /app

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/apps/admin/package.json ./apps/admin/package.json
COPY --from=build /app/apps/admin/.next ./apps/admin/.next
COPY --from=build /app/apps/admin/next.config.ts ./apps/admin/next.config.ts
COPY --from=build /app/apps/admin/public ./apps/admin/public
COPY --from=build /app/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
WORKDIR /app/apps/admin

USER app
EXPOSE 3001

CMD ["./node_modules/.bin/next", "start", "-p", "3001"]
