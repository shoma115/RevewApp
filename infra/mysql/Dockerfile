FROM mysql/mysql-server:8.0

ENV MYSQL_DATABASE=lesson_review \
  MYSQL_USER=shoma \
  MYSQL_PASSWORD=reviewapp31397fuiw9 \
  MYSQL_ROOT_PASSWORD=reviewapp31397fuiw9 \
  TZ=Asia/Tokyo

COPY ./server.conf /etc/my.cnf
RUN chmod 644 /etc/my.cnf
