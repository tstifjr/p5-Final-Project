"""added sq_border_color column to user table

Revision ID: 8fdf94a52d68
Revises: 25808c7a7deb
Create Date: 2023-08-30 09:50:33.857963

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fdf94a52d68'
down_revision = '25808c7a7deb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sq_border_color', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('sq_border_color')

    # ### end Alembic commands ###
