import { Injectable } from "@angular/core";
import { create } from 'ipfs-http-client'

@Injectable({
  providedIn: "root"
})
export class IpfsService {
  constructor() { }
  upload(fileBuffer: any) {
    const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
    return client.add(fileBuffer)
  }
}