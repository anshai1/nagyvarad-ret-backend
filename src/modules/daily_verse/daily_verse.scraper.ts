import axios from 'axios';
import * as JSDOM from "jsdom";
import moment from "moment";
import { DailyVerseDTO } from '../../common/dto/daily_verse.dto'

const URL = 'https://reformatus.hu/isten-szolt/';

export async function scrape_daily_verse_by_date(date_string: string): Promise<DailyVerseDTO> {
  const date = moment(date_string).toDate();
  const url = (date_string !== null && date_string.length > 0) ? URL + `?d=${date_string}` : URL;
  return await scrape_dv(url, date);
}

export async function scrape_dv(url: string, date = moment().startOf('day').toDate()) {
  const response = await axios.get(url, {
    headers: {
      'accept-encoding': '*'
    }
  });

  const dom = new JSDOM.JSDOM(response.data).window.document;

  const date_label = get_text_content_by_qs(dom, '.article__date');
  const name_day = get_text_content_by_qs(dom, '.article__nameday');
  const song_index = get_text_content_by_qs(dom, '.block__new_explanation :nth-child(2)');
  const song_name = get_text_content_by_qs(dom, '.block__new_explanation :nth-child(3)');

  const new_verse_title = dom.querySelector('.block__new_title')?.childNodes[0]?.textContent?.trim() || '';
  const new_verse_location =  get_text_content_by_qs(dom, '.block__new_title > .block__new_paragraph');
  const new_verse =  get_text_content_by_qs(dom, '.block__new_text');
  const new_explanation_title =get_text_content_by_qs(dom, '.block__new_info');
  const new_explanation = get_text_content_by_qs(dom, '.block__new_explanation :nth-child(1)');

  const old_verse_title = dom.querySelector('.block__old_title')?.childNodes[0]?.textContent?.trim() || '';
  const old_verse_location = get_text_content_by_qs(dom, '.block__old_title > .block__old_paragraph');
  const old_verse = get_text_content_by_qs(dom, '.block__old_text');
  const old_explanation_title = get_text_content_by_qs(dom, '.block__old_info');
  const old_explanation_subtitle = dom.querySelector('.block__old_explanation :nth-child(1) :nth-child(1)')?.innerHTML.trim() || '';
  const old_explanation = dom.querySelector('.block__old_explanation')?.childNodes[0]?.childNodes[1].textContent?.trim() || '';

  return {
    date: date,
    date_label,
    name_day,
    song_index,
    song_name,

    new_verse_title,
    new_verse_location,
    new_verse,
    new_explanation_title,
    new_explanation,

    old_verse_title,
    old_verse_location,
    old_verse,
    old_explanation_title,
    old_explanation_subtitle,
    old_explanation
  }
}

function get_text_content_by_qs(dom: Document, selector: string) {
  return dom.querySelector(selector)?.textContent || '';
}
