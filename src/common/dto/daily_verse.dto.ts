export class DailyVerseDTO {
  constructor(
    public date: Date,
    public date_label: string,
    public name_day: string,
    public song_index: string,
    public song_name: string,

    public new_verse_title: string,
    public new_verse_location: string,
    public new_verse: string,
    public new_explanation_title: string,
    public new_explanation: string,

    public old_verse_title: string,
    public old_verse_location: string,
    public old_verse: string,
    public old_explanation_title: string,
    public old_explanation_subtitle: string,
    public old_explanation: string,

    public ID?: number,
    public created_at?: Date,
    public updated_at?: Date,
  ) {}
}