FROM alpine:3.8
ENV HOME=/home/gitpod
WORKDIR $HOME
RUN { echo && echo "PS1='\[\e]0;\u \w\a\]\[\033[01;32m\]\u\[\033[00m\] \[\033[01;34m\]\w\[\033[00m\] \\\$ '" ; } >> .bashrc
RUN addgroup gitpod && \
    adduser -G gitpod -s /bin/bash -D gitpod
RUN chmod g+rw /home && \
    mkdir -p /workspace && \
    chown -R gitpod:gitpod /home/gitpod && \
    chown -R gitpod:gitpod /workspace;
ENV SHELL /bin/bash
ENV USE_LOCAL_GIT true

# Give control to gitpod
USER root

# Gitpod configuration
ENV GITPOD_HOME /home/gitpod
ENV GITPOD_UID_GID 33333

RUN addgroup -g 33333 gitpod && \
    adduser -G gitpod -u 33333 -s /bin/bash -D gitpod

# Keep the stemn user configuration
RUN chown -R $GITPOD_UID_GID:$GITPOD_UID_GID $GITPOD_HOME

# Remove root user config that gitpod copies over
RUN rm -rf /root
RUN mkdir -p /root
RUN touch /root/dontremove
