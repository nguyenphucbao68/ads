# FROM node AS deps
# node 18
FROM node:18.3.0-alpine3.14 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:18.3.0-alpine3.14 AS builder
WORKDIR /app    
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM nginx:stable-alpine AS runner
WORKDIR /app    
# RUN addgroup -g 1001 appgroup
# RUN adduser -D -u 1001 appuser -G appgroup
# RUN chown -R appuser:appgroup /app
# USER appuser
# COPY --from=builder --chown=appuser:appgroup /app/build /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]