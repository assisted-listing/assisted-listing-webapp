import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  private apiUrl = 'https://api.openai.com/v1//chat/completions';

  constructor(private http: HttpClient) {}

  getListing(prompt: string) {
    const headers = new HttpHeaders().set('Authorization', environment.openAISK);
    const body = {
      "model": "gpt-3.5-turbo",
      "messages": [
          {
              "role": "user",
              "content": prompt
          }
      ],
      "temperature": 1,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "max_tokens": 500,
      "presence_penalty": 0,
      "frequency_penalty": 0
  }
    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}