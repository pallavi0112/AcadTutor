from pymongo import MongoClient

def get_db_handle():
    client = MongoClient("mongodb+srv://rahul20bollisetty:rahul2000@cluster0.bhe874l.mongodb.net/?retryWrites=true&w=majority")
    db_handle = client['acadtutor']
    print(db_handle)
    return db_handle, client
def get_collection_handle(db_handle,collection_name):
    return db_handle[collection_name]
