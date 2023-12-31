"""adds games table & squares table

Revision ID: 00cf8c105d85
Revises: cc68b131303f
Create Date: 2023-08-17 10:35:37.308695

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '00cf8c105d85'
down_revision = 'cc68b131303f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('squares',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('board_pos', sa.Integer(), nullable=False),
    sa.Column('row_num', sa.Integer(), nullable=True),
    sa.Column('col_num', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_squares_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('win_score', sa.Integer(), nullable=True),
    sa.Column('lose_score', sa.Integer(), nullable=True),
    sa.Column('round', sa.Integer(), nullable=True),
    sa.Column('win_team', sa.String(), nullable=True),
    sa.Column('lose_team', sa.String(), nullable=True),
    sa.Column('square_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['square_id'], ['squares.id'], name=op.f('fk_games_square_id_squares')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('games')
    op.drop_table('squares')
    # ### end Alembic commands ###
