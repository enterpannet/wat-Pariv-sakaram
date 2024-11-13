FROM jarredsumner/bun:latest

WORKDIR /app

COPY package*.json bun.lockb* ./

RUN bun --version  # Print Bun version for verification
RUN bun install || cat /var/log/bun-errors.log  # Output errors if installation fails

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "serve", "-s", "dist", "-l", "3000"]
