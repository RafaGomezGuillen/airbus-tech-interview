"""initial

Revision ID: 2223fbff370e
Revises: 
Create Date: 2026-02-07 08:45:10.194161

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2223fbff370e'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'aircrafts',
        sa.Column('serial_number', sa.String(), primary_key=True, nullable=False),
        sa.Column('model', sa.String(), nullable=True),
        sa.Column('manufacturer', sa.String(), nullable=True),
        sa.Column('capacity', sa.Integer(), nullable=True),
        sa.Column('configuration', sa.Integer(), nullable=True),
    )

    op.create_table(
        'materials',
        sa.Column('pn', sa.String(), primary_key=True, nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('type', sa.String(), nullable=True),
        sa.Column('weight', sa.Integer(), nullable=True),
    )

    op.create_table(
        'orders',
        sa.Column('id', sa.Integer(), primary_key=True, nullable=False),
        sa.Column('aircraft_serial', sa.String(), sa.ForeignKey('aircrafts.serial_number'), nullable=True),
        sa.Column('material_pn', sa.String(), sa.ForeignKey('materials.pn'), nullable=True),
        sa.Column('arrival_date', sa.Date(), nullable=True),
        sa.Column('status', sa.String(), nullable=True),
    )


def downgrade() -> None:
    op.drop_table('orders')
    op.drop_table('materials')
    op.drop_table('aircrafts')
