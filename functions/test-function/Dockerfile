FROM public.ecr.aws/lambda/python:3.8
WORKDIR ${LAMBDA_TASK_ROOT}

# Install.
ENV POETRY_HOME=/opt/poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Configure.
ENV PATH="$POETRY_HOME/bin:$PATH"
RUN poetry config virtualenvs.create false

# Run install.
COPY poetry.lock pyproject.toml .
RUN poetry install --no-root --only main --no-interaction --no-ansi

# Get app.
COPY index.py .

CMD [ "index.handler" ]
