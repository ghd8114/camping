package com.example.server.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "`option`")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Option {

    @Id
    @Column(name = "option_id")
    private Integer optionId;
    @Column(name = "option_name")
    private String optionName;
    @Column(name = "option_price")
    private Integer optionPrice;
    @Column(name = "option_pic")
    private String optionPic;
}
