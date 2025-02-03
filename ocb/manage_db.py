# from sqlalchemy.ext.asyncio import AsyncEngine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy import MetaData
# from ocb.models import ClipBoard
# from ocb.database import engine

# import asyncio

# async def recreate_table():
#     # Dropping and recreating the table
#     async with engine.begin() as conn:
#         # Drop the table
#         await conn.run_sync(ClipBoard.__table__.drop)
        
#         # Recreate the table
#         await conn.run_sync(ClipBoard.__table__.create)
    
#     print("Database table dropped and recreated successfully.")

# # Running the function
# if __name__ == "__main__":
#     asyncio.run(recreate_table())
