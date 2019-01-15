<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Item extends Model
{
    protected $fillable = [
        'title', 'comment',
    ];

    protected $appends = ['written_at', 'modified_at', 'created_date', 'updated_date'];

    protected $casts = [
        'created_at' => 'date:Y-m-d',
        'updated_at' => 'date:Y-m-d',
    ];

    public function getCreatedDateAttribute()
    {
        return Carbon::parse($this->created_at)->format('Y-m-d H:i:s');
    }

    public function getUpdatedDateAttribute()
    {
        return Carbon::parse($this->updated_at)->format('Y-m-d H:i:s');
    }

    public function getWrittenAtAttribute()
    {
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    public function getModifiedAtAttribute()
    {
        return Carbon::parse($this->updated_at)->diffForHumans();
    }
}
