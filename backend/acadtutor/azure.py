import uuid
from io import BytesIO
from pathlib import Path
from azure.storage.blob import BlobServiceClient

ALLOWED_EXTENTIONS = ['.pdf','.doc','.docx','.mp4','.ogg','.webm','.jpg','.jpeg','.png']
conn_key = "DefaultEndpointsProtocol=https;AccountName=acadtutor;AccountKey=xPAnHYEpyRbOvK/NwaTKAtyrqLwRIbvGA20/A4aw3oHvjxxNkKnrFCZ00/HKuKIWlquvp/0WFrC5+AStAFKzQg==;EndpointSuffix=core.windows.net"
def create_blob_client(file_name):
    blob_service_client = BlobServiceClient.from_connection_string(conn_key)
    blob_client = blob_service_client.get_blob_client(container='acadtutor', blob=file_name)
    return blob_client
def check_file_ext(path):
    ext = Path(path).suffix
    return ext in ALLOWED_EXTENTIONS

def upload(file):
    if not check_file_ext(file.name):
        return
    file_upload_name = str(uuid.uuid4()) + file.name
    file_content = file.read()
    file_io = BytesIO(file_content)
    blob_service_client = create_blob_client(file_upload_name)
    blob_service_client.upload_blob(data=file_io)
    return blob_service_client.url    
