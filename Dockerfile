# Sử dụng image Node.js chính thức
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /giapha/backend

# Sao chép file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn của dự án vào container
COPY . .

# Build mã nguồn TypeScript
RUN npm run build

# Expose cổng mà ứng dụng sẽ chạy (NestJS thường chạy trên cổng 3000)
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start:prod"]
